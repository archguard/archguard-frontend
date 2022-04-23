import axios from "../axios";

interface CompositionDependency {
  id: string;
  systemId: string;
  name: string;
  version: string;
  parentId: string;
  packageManager: string;
  depName: string;
  depGroup: string;
  depArtifact: string;
  depMetadata: string;
  depSource: string;
  depScope: string;
}

export function queryProjectCompositionDependency(id: number) {
  return axios<CompositionDependency[]>({
    url: `/api/systems/${id}/project/sca`,
    method: "GET",
  });
}
