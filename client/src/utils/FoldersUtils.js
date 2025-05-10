// utils/FoldersUtils.js
import { graphQLRequest } from "./request";

export const foldersLoader = async () => {
  const query = `query Folders {
    folders {
      id
      name
      createdAt
    }
  }`;

  try {
    const data = await graphQLRequest({ query });
    return { folders: data?.folders || [] };
  } catch (error) {
    console.error("❌ Lỗi khi fetch folders:", error);
    return { folders: [] };
  }
};

export const addNewFolder = async (newFolder) => {
  const query = `mutation AddNewFolder($name: String!) {
    addFolder(name: $name) {
      name
      author{
        name
      }
    }
  }`;
  const data = await graphQLRequest({query, variables: {name: newFolder.name}})
  return data;
}
