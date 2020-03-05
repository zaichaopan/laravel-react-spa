let { useEffect } = require('react');

function useDocumentTitle (title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export default useDocumentTitle;
