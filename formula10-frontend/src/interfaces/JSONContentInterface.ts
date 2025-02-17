interface RulesContent {
    title: string;
    preContext: string;
    listElements: ListPoint[];
  }
  interface ListPoint {
    title: string;
    context: string;
    list: string[];
  }  