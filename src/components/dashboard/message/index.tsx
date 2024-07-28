import DashboardHeaderOne from "@/layouts/headers/dashboard/DashboardHeaderOne"
import MessageBody from "./MessageBody"

const DashboardMessage = ({data}: any) => {
   return (
      <>
         <DashboardHeaderOne />
         <MessageBody data={data}/>
      </>
   )
}

export default DashboardMessage
