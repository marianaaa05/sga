import {Header} from "./header";
 import {Footer} from "./footer";
 
 type Props = {
   children: React.ReactNode
 }
 
 const MarkLayout = ({children}: Props) => {
   return ( 
     <div>
       <Header/>
       <main>
       {children}
       </main>
       <Footer/>
     </div>
    );
 }
  
 export default MarkLayout;