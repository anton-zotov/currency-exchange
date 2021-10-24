export type TestCase = {
    params: any[];
    result: any;
};

export function testResults(
    cases: TestCase[],
    fn: (a: any, b?: any, c?: any, d?: any) => any
) {
    cases.forEach(({ params, result }) => {
        it(`returns ${result} when params are ${params}`, () => {
            expect(fn(...(params as [any]))).toEqual(result);
        });
    });
}
