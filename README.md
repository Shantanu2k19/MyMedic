basic application

- login system complete
- mobile view in home not proper
- home screen adding photo section map
- settings page basic and styling
- zod validation implementation, using interface for data
- login signup as modal on pdp
- store csrf token/its hash somewhere on local browser, no continuous calling of api 

--------


Review pending 
- landing page pdp
  1.  pdp page
  2.  Authentication (login, login with google/fb/phonenumber/mail, session manager)
  3.  Ui development after login
      3.1 home screen (scan wali)
      3.2 appointment wala page
      3.3 Account wala page
      3.4 Medical news/wellness wala page
  4.  Scanning and text extraction
      4.1 Computer generated
      4.1.1 E-pdf
      4.1.2 PDF photo clicked
      4.1.3 print out photo
      4.2 Hand written
  5.  Medicine database
      5.1 collection
      5.2 verification
  6.  Video call, audio call, chatting functionality
  7.  Admin page



-----------


toatst usage 

import { useTheme } from "next-themes";
import { toast } from 'react-toastify';

 function showAlert(mssg: string, mode:number) {
    console.log(theme)

    if (mode == 1) {
      toast.success(mssg, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme
      });
    } else if (mode == 2) {
      toast.info(mssg, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
      });
    } else {
      toast.error(mssg, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
      });
    }
  }

  onClick={() => showAlert("Connecting to server...", 2)}

  use contained as well 
