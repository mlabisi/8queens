export const SOLUTIONTEXT = 'SOLUTIONTEXT';

export function getSolution(solution) {
    return {
        type: SOLUTIONTEXT,
        solutionText: solution
    }
}
