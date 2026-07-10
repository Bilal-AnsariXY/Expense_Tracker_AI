// import "./globals.css";

// import ReduxProvider from "../store/ReduxProvider";

// import Sidebar from "../components/layout/Sidebar";
// import Navbar from "../components/layout/Navbar";

// export const metadata = {
//   title: "Expense Tracker AI",
//   description: "Expense Tracker with AI",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <ReduxProvider>
//           <div className="flex h-screen bg-gray-100">
//             <Sidebar />

//             <div className="flex flex-1 flex-col overflow-hidden">
//               <Navbar />

//               <main className="flex-1 overflow-y-auto p-8">{children}</main>
//             </div>
//           </div>
//         </ReduxProvider>
//       </body>
//     </html>
//   );
// }

import "./globals.css";

import ReduxProvider from "../store/ReduxProvider";

export const metadata = {
  title: "Expense Tracker AI",
  description: "Expense Tracker with AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}