import { createContext, useContext, useEffect, useState } from 'react'

const ModalContext = createContext({
  openPopup: (content: React.ReactNode) => { }
});
// eslint-disable-next-line react-refresh/only-export-components
export const useModalContext = () => {
  return useContext(ModalContext);
}


const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [content, setContent] = useState<React.ReactNode | null>(null);


  useEffect(() => {
    if (isShowing) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  }, [isShowing])

  const openPopup = (content: React.ReactNode) => {
    setContent(content);
    setIsShowing(true);
  };

  return (
    <ModalContext.Provider value={{ openPopup }}>
      {children}
      {isShowing && (
        <div className="fixed inset-0">
          <div
            className="absolute inset-0 flex items-center justify-center bg-slate-600/60"
            onClick={() => setIsShowing(false)}
          >
            {content}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  )

}

export default ModalProvider
