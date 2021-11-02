import { FieldNode, GraphQLResolveInfo } from 'graphql';

const recursiveAddProperties = (field: FieldNode) => {
  const propertyMapping = {};
  if(field.selectionSet) {
    for (let i = 0, len = field.selectionSet.selections.length; i < len; i++) {
      const fieldNode = field.selectionSet.selections[i] as FieldNode;
      propertyMapping[fieldNode.name.value] = recursiveAddProperties(fieldNode);
    }
  }

  return propertyMapping;
}

export const requestedProperties = (
  resolverName: string, resolverInfo: GraphQLResolveInfo ) => {
  const fieldNode = resolverInfo.fieldNodes.find(resolverNode => resolverNode.name.value === resolverName);
  return recursiveAddProperties(fieldNode);
}
