export const Languages = [
  { "id": 45, "name": "Assembly (NASM 2.14.02)", "aceName": "assembly_x86", "extension": ".asm", "sample": "section .data\n    msg db 'Hello, World!', 0xa\n\nsection .text\n    global _start\n_start:\n    mov eax, 4\n    mov ebx, 1\n    mov ecx, msg\n    mov edx, 14\n    int 0x80\n    mov eax, 1\n    int 0x80" },
  { "id": 46, "name": "Bash (5.0.0)", "aceName": "sh", "extension": ".sh", "sample": "echo \"Hello, World!\"" },
  { "id": 103, "name": "C (GCC 14.1.0)", "aceName": "c_cpp", "extension": ".c", "sample": "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}" },
  { "id": 105, "name": "C++ (GCC 14.1.0)", "aceName": "c_cpp", "extension": ".cpp", "sample": "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, World!\" << std::endl;\n    return 0;\n}" },
  { "id": 86, "name": "Clojure (1.10.1)", "aceName": "clojure", "extension": ".clj", "sample": "(println \"Hello, World!\")" },
  { "id": 51, "name": "C# (Mono 6.6.0.161)", "aceName": "csharp", "extension": ".cs", "sample": "using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine(\"Hello, World!\");\n    }\n}" },
  { "id": 60, "name": "Go (1.13.5)", "aceName": "golang", "extension": ".go", "sample": "package main\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, World!\")\n}" },
  { "id": 61, "name": "Haskell (GHC 8.8.1)", "aceName": "haskell", "extension": ".hs", "sample": "main = putStrLn \"Hello, World!\"" },
  { "id": 91, "name": "Java (JDK 17.0.6)", "aceName": "java", "extension": ".java", "sample": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}" },
  { "id": 102, "name": "JavaScript (Node.js 22.08.0)", "aceName": "javascript", "extension": ".js", "sample": "console.log(\"Hello, World!\");" },
  { "id": 111, "name": "Kotlin (2.1.10)", "aceName": "kotlin", "extension": ".kt", "sample": "fun main() {\n    println(\"Hello, World!\")\n}" },
  { "id": 64, "name": "Lua (5.3.5)", "aceName": "lua", "extension": ".lua", "sample": "print(\"Hello, World!\")" },
  { "id": 68, "name": "PHP (7.4.1)", "aceName": "php", "extension": ".php", "sample": "<?php\necho \"Hello, World!\";" },
  { "id": 109, "name": "Python (3.13.2)", "aceName": "python", "extension": ".py", "sample": "print(\"Hello, World!\")" },
  { "id": 108, "name": "Rust (1.85.0)", "aceName": "rust", "extension": ".rs", "sample": "fn main() {\n    println!(\"Hello, World!\");\n}" },
  { "id": 101, "name": "TypeScript (5.6.2)", "aceName": "typescript", "extension": ".ts", "sample": "const msg: string = \"Hello, World!\";\nconsole.log(msg);" }
]