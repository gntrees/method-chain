import { expect, test } from "bun:test";
import { validateProject } from "../core/core";
import type { ProjectType } from "../core/core.types";

const makeProject = (overrides?: Partial<ProjectType["project"]>): ProjectType => ({
    project: {
        projectName: "test",
        importPaths: {},
        definitions: [{
            structure: {
                name: "foo",
                exportName: "schema",
                variables: [],
                functions: [],
            },
        }],
        initFunctions: [],
        ...overrides,
    },
});

test("valid project passes", () => {
    expect(() => validateProject(makeProject())).not.toThrow();
});

test("duplicate function name throws", () => {
    const p = makeProject();
    p.project.definitions[0]!.structure.functions = [
        { function: { name: "bar", arguments: [], return: { structureCall: { name: "foo" } }, isTemplateLiteral: false } },
        { function: { name: "bar", arguments: [], return: { structureCall: { name: "foo" } }, isTemplateLiteral: false } },
    ];
    expect(() => validateProject(p)).toThrow(/Duplicate function "bar" in structure "foo"/);
});

test("duplicate property name throws", () => {
    const p = makeProject();
    p.project.definitions[0]!.structure.variables = [
        { variable: { name: "prop", value: { structureCall: { name: "foo" } } } },
        { variable: { name: "prop", value: { structureCall: { name: "foo" } } } },
    ];
    expect(() => validateProject(p)).toThrow(/Duplicate property "prop" in structure "foo"/);
});

test("function/property name collision throws", () => {
    const p = makeProject();
    p.project.definitions[0]!.structure.functions = [
        { function: { name: "shared", arguments: [], return: { structureCall: { name: "foo" } }, isTemplateLiteral: false } },
    ];
    p.project.definitions[0]!.structure.variables = [
        { variable: { name: "shared", value: { structureCall: { name: "foo" } } } },
    ];
    expect(() => validateProject(p)).toThrow(/Name collision between function and property "shared"/);
});

test("function returning undefined structure throws", () => {
    const p = makeProject();
    p.project.definitions[0]!.structure.functions = [
        { function: { name: "bar", arguments: [], return: { structureCall: { name: "nope" } }, isTemplateLiteral: false } },
    ];
    expect(() => validateProject(p)).toThrow(/Function "bar" in structure "foo" returns undefined structure "nope"/);
});

test("property referencing undefined structure throws", () => {
    const p = makeProject();
    p.project.definitions[0]!.structure.variables = [
        { variable: { name: "prop", value: { structureCall: { name: "nope" } } } },
    ];
    expect(() => validateProject(p)).toThrow(/Property "prop" in structure "foo" references undefined structure "nope"/);
});

test("init function returning undefined structure throws", () => {
    const p = makeProject({ initFunctions: [{ name: "init", withVariableName: true, return: { structureCall: { name: "nope" } } }] });
    expect(() => validateProject(p)).toThrow(/Init function "init" returns undefined structure "nope"/);
});

test("template literal with more than one argument throws", () => {
    const p = makeProject();
    p.project.definitions[0]!.structure.functions = [{
        function: {
            name: "t",
            arguments: [
                { argument: { name: "a", struct: { struct: { string: { type: "string" } } } } },
                { argument: { name: "b", struct: { struct: { string: { type: "string" } } } } },
            ],
            return: { structureCall: { name: "foo" } },
            isTemplateLiteral: true,
        },
    }];
    expect(() => validateProject(p)).toThrow(/Template literal function "t" must have exactly one argument/);
});