import { createRoot } from "react-dom/client";
import { AppShell } from "@/components/editor/app-shell";
import { installEmbeddedData } from "@/lib/editor/embedded-bundle";
import "./styles.css";

installEmbeddedData();

const root = document.getElementById("root");
if (!root) throw new Error("root");
createRoot(root).render(<AppShell />);
