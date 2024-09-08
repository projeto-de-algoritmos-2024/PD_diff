import { useRef, useState } from "react";
import { Text, Box, Flex } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import DiffButton from "./DiffButton";

const CodeEditor = () => {
  const editorRef = useRef();
  const [oldCode, setOldCode] = useState("");
  const [newCode, setNewCode] = useState("");
  const [diffResult, setDiffResult] = useState([]);
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setOldCode(CODE_SNIPPETS[language]);
    setNewCode("");
  };

  return (
    <div>
      <div>
        <Box mb={2}>
          <LanguageSelector language={language} onSelect={onSelect} />
        </Box>
        <Box mt={2} textAlign="center">
          <DiffButton code1={oldCode} code2={newCode} diffResult={diffResult} setDiffResult={setDiffResult} />
        </Box>
      </div>
      <div>
        <Flex height="60vh" alignItems="flex-start">
          <Box w="50%" p={4} height="60vh">
            <Flex direction="column" height="100%">
              <Box flex="1" height="100%">
                <Editor
                  options={{
                    minimap: {
                      enabled: false,
                    },
                  }}
                  height="100%"
                  theme="vs-dark"
                  language={language}
                  defaultValue={CODE_SNIPPETS[language]}
                  onMount={onMount}
                  value={oldCode}
                  onChange={(oldCode) => setOldCode(oldCode)}
                />
              </Box>
            </Flex>
          </Box>

          <Box w="50%" p={4} height="60vh">
            <Editor
              options={{
                minimap: {
                  enabled: false,
                },
              }}
              height="100%"
              theme="vs-dark"
              language={language}
              onMount={onMount}
              value={newCode}
              onChange={(newCode) => setNewCode(newCode)}
            />
          </Box>
        </Flex>
      </div>
      <div>
        <Box mt={4} p={4} borderWidth="1px" borderRadius="lg" bg="gray.800" overflowY="scroll" height="2000px">
          {console.log(diffResult)}
          {diffResult.length > 0 ? (
            diffResult.map((change, index) => (
              <Text
                key={index}
                as="pre"
                color={change.type === 'added' ? "green.100" : change.type === 'deleted' ? "red.100" : "white"}
                bg={change.type === 'added' ? "green.700" : change.type === 'deleted' ? "red.700" : "transparent"}
                whiteSpace="pre-wrap"
                wordBreak="break-word"
                fontFamily="monospace"
              >
                {change.type === 'added' ? `+ ${change.line}` : change.type === 'deleted' ? `- ${change.line}` : `  ${change.line}`}
              </Text>
            ))
          ) : (
            <Text fontFamily="monospace">No changes found.</Text>
          )}
        </Box>
      </div>
    </div>
  );
};

export default CodeEditor;
