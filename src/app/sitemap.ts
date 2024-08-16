// import { getCourses } from "@/actions/get-courses"
export default async function sitemap() {

    // const getCourse = await getCourses({})

    // const courses = getCourse?.map((course:any) => {
    //     return {
    //         url: `https://nizzyabi.com/courses/${course?.id}/info`,
    //         lastModified: course?.createdAt
    //     }
    // })
    return [{
        url: 'trucksupport.com',
        lastModified: new Date()
    },
        // ...courses
    ]
}