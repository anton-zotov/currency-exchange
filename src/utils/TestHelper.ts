export type TestCase = {
    params: [any];
    result: any;
};

export function testResults(cases: TestCase[], fn: (input: any) => any) {
    cases.forEach(({ params, result }) => {
        it(`returns ${result} when params are ${params}`, () => {
            expect(fn(...params)).toBe(result);
        });
    });
}
