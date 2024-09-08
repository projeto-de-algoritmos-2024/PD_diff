import { useState } from "react";
import { Box, Button, Textarea } from "@chakra-ui/react";

function diffLines(oldCode, newCode) {
    const oldLines = oldCode.split('\n');
    const newLines = newCode.split('\n');

    const m = oldLines.length;
    const n = newLines.length;

    // Inicializa a matriz para o cálculo LCS
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    // Preenche a matriz
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (oldLines[i - 1] === newLines[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    const operations = [];
    let i = m, j = n;

    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
            operations.unshift({ type: 'unchanged', line: oldLines[i - 1] });
            i--; j--;
        } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
            operations.unshift({ type: 'added', line: newLines[j - 1] });
            j--;
        } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
            operations.unshift({ type: 'deleted', line: oldLines[i - 1] });
            i--;
        }
    }

    return operations;
}

const DiffButton = ({ code1, code2, diffResult, setDiffResult }) => {
    const handleDiff = () => {
        console.log('Diffing code...');
        const diff = diffLines(code1, code2);
        setDiffResult(diff);
    };

    return (
        <Button colorScheme="teal" size="lg" onClick={handleDiff} >
            Comparar Código
        </Button>
    );
};

export default DiffButton;