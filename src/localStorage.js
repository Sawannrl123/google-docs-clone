const localForage = () => {
  const isStorage = typeof Storage !== "undefined";
  if (isStorage) {
    const getItem = async key => {
      const content = localStorage.getItem(key);
      return JSON.parse(content);
    };

    const removeItem = async key => localStorage.removeItem(key);

    const setItem = async (key, value) => {
      const content = JSON.stringify(value);
      localStorage.setItem(key, content);
      return { [key]: content };
    };

    return {
      getItem,
      removeItem,
      setItem
    };
  }
  return null;
};

export default localForage;
