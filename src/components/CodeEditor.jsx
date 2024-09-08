import { useRef, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <div>
      <div>
        <Box mb={2}>
          <LanguageSelector language={language} onSelect={onSelect} />
        </Box>
      </div>
      <div>
        <Flex height="100vh" alignItems="flex-start">
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
                  value={value}
                  onChange={(value) => setValue(value)}
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
              value={value2}
              onChange={(value2) => setValue2(value2)}
            />
          </Box>
        </Flex>
      </div>
    </div>
  );
};

export default CodeEditor;
