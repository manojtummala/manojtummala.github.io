declare module "react-mermaid2" {
  import * as React from "react";
  export interface MermaidProps {
    chart: string;
    config?: object;
    className?: string;
    style?: React.CSSProperties;
  }
  export const Mermaid: React.FC<MermaidProps>;
  export default Mermaid;
}
