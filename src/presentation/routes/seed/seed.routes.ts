import { Hono } from "hono";
import { prisma } from "../../../infrastructure/orm/prisma";

export class SeedRoutes {

    constructor(
    ) { }

    public get routes() {
        const router = new Hono();

        router.post("/", async (c) => {
            try {
                await prisma.application.deleteMany()
                await prisma.savedAdvertisementJob.deleteMany()
                await prisma.reportAdvertisementJob.deleteMany()
                await prisma.jobAdvertisement.deleteMany()
                await prisma.company.deleteMany()
                await prisma.category.deleteMany()
                await prisma.user.deleteMany()


                const createdUsers = await Promise.all([
                    prisma.user.create({
                        data: {
                            name: "UserAdmin",
                            email: "admin@admin.com",
                            password: await Bun.password.hash("Gi@nmarco159789$"),
                            roles: ["admin"]
                        }
                    }),
                    prisma.user.create({
                        data: {
                            name: "UserNormal",
                            email: "normal@normal.com",
                            password: await Bun.password.hash("Gi@nmarco159789$"),
                            roles: ["normal"]
                        }
                    }),
                    prisma.user.create({
                        data: {
                            name: "UserNormal2",
                            email: "normal2@normal2.com",
                            password: await Bun.password.hash("Gi@nmarco159789$"),
                            roles: ["normal"]
                        }
                    })
                ])

                const createdCategories = await Promise.all([
                    prisma.category.create({
                        data: {
                            name: "Finance"
                        }
                    }),
                    prisma.category.create({
                        data: {
                            name: "Marketing"
                        }
                    }),
                    prisma.category.create({
                        data: {
                            name: "Human Resources"
                        }
                    }),
                    prisma.category.create({
                        data: {
                            name: "Sales"
                        }
                    }),
                    prisma.category.create({
                        data: {
                            name: "Tech"
                        }
                    }),
                ])

                const createdCompanies = await Promise.all([
                    prisma.company.create({
                        data: {
                            name: "Compañia 1",
                            description: "Fusce imperdiet lacinia sem ut tincidunt. Fusce eget aliquet tellus. Quisque rutrum nisi vitae sem venenatis, sed porta massa volutpat. Nullam placerat, purus ut consequat semper, justo ex aliquet metus, in cursus mi ipsum vel lectus. In nec enim pharetra dui finibus faucibus vitae ac augue. Aenean mattis hendrerit augue, non mollis eros vehicula eu. Pellentesque ut sodales tortor. Curabitur nec tortor in ipsum congue dapibus in eu ipsum. Praesent eget est ipsum. Donec arcu ipsum, imperdiet sit amet semper sit amet, sollicitudin sed erat. In vehicula erat tellus.",
                            industry: "Derecho",
                            address: "Av Perú",
                            phone: "+51 991 128 721",
                            website: "https://google.com",
                            socialLinks: ["https://google.com", "https://facebook.com", "https://twitter.com"],
                            logoUrl: "https://img.freepik.com/free-vector/gradient-mc-logo-design_23-2149487341.jpg?t=st=1734888762~exp=1734892362~hmac=1ef02edb46cebf5794fd33883dfa0105d3e553521a67882eaaa14ed10fc2c44b&w=826",
                            bannerUrl: "https://plus.unsplash.com/premium_photo-1661962648855-b97a8e025e0e?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            userId: createdUsers[1].id
                        }
                    }),
                    prisma.company.create({
                        data: {
                            name: "Compañia 2",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel lectus libero. Cras id ante lacinia, congue urna sed, gravida tellus. Nam at nulla velit. Duis quis fringilla orci, non egestas ligula. Pellentesque vel nibh eget augue dignissim facilisis. Fusce faucibus ipsum eu magna tristique laoreet. Praesent gravida luctus eros, ut rhoncus erat scelerisque non. Maecenas id risus volutpat, commodo tellus ac, cursus metus. Mauris eget fermentum purus. Integer ut ligula elementum, commodo nisl eu, ornare lectus. Donec ante leo, venenatis quis condimentum nec, mollis ut magna.",
                            industry: "Tecnologia",
                            address: "Av Argentina",
                            phone: "+51 965 094 753",
                            website: "https://twitter.com",
                            socialLinks: ["https://google.com", "https://facebook.com", "https://twitter.com"],
                            logoUrl: "https://img.freepik.com/free-vector/pink-blue-abstract-logo_1222-54.jpg?t=st=1734889033~exp=1734892633~hmac=bfef13f6cf94230d93fa9e497a8aa2d49302cc5733263beb7bc00fc4ebd664f1&w=826",
                            bannerUrl: "https://cdn.pixabay.com/photo/2016/07/08/15/44/banner-1504653_1280.png",
                            userId: createdUsers[2].id
                        }
                    }),
                ])


                const additionalAdvertisementJobs = await Promise.all([
                    prisma.jobAdvertisement.create({
                        data: {
                            title: "Frontend Developer Needed",
                            description: "Join our dynamic team to build cutting-edge user interfaces using React and TypeScript.",
                            workMode: "REMOTE",
                            publishType: "USER",
                            userId: createdUsers[2].id,
                            categoryId: createdCategories[4].id,
                            experienceLevel: "mid",
                            jobType: "FULL_TIME",
                            additionalInformation: "Looking for someone who can start immediately.",
                            location: "San Francisco, CA",
                            requirements: ["React", "JavaScript", "TypeScript", "CSS"],
                            benefits: ["Health insurance", "Remote work", "Flexible hours"],
                            applicationLinks: ["https://example.com/apply/frontend"],
                            salay: 6000,
                            vacancies: 2,
                            workHours: "8",
                            languagesRequired: ["English"],
                        }
                    }),
                    prisma.jobAdvertisement.create({
                        data: {
                            title: "Marketing Specialist",
                            description: "Help us craft compelling marketing strategies and manage campaigns across multiple channels.",
                            workMode: "ONSITE",
                            publishType: "COMPANY",
                            companyId: createdCompanies[0].id,
                            categoryId: createdCategories[1].id,
                            experienceLevel: "senior",
                            jobType: "PART_TIME",
                            additionalInformation: "Experience in social media campaigns is a plus.",
                            location: "New York, NY",
                            requirements: ["SEO", "Google Ads", "Copywriting"],
                            benefits: ["401k", "Bonuses"],
                            applicationLinks: ["https://example.com/apply/marketing"],
                            salay: 4500,
                            vacancies: 1,
                            workHours: "4",
                            languagesRequired: ["English", "Spanish"],
                        }
                    }),
                    prisma.jobAdvertisement.create({
                        data: {
                            title: "Backend Developer",
                            description: "We are looking for a skilled backend developer to maintain and extend our APIs.",
                            workMode: "REMOTE",
                            publishType: "USER",
                            userId: createdUsers[1].id,
                            categoryId: createdCategories[4].id,
                            experienceLevel: "junior",
                            jobType: "INTERNSHIP",
                            additionalInformation: "Experience with Node.js and Prisma is preferred.",
                            location: "Remote",
                            requirements: ["Node.js", "Prisma", "SQL"],
                            benefits: ["Competitive pay", "Remote-friendly"],
                            applicationLinks: ["https://example.com/apply/backend"],
                            salay: 7000,
                            vacancies: 1,
                            workHours: "8",
                            languagesRequired: ["English"],
                        }
                    }),
                    prisma.jobAdvertisement.create({
                        data: {
                            title: "HR Coordinator",
                            description: "Manage our recruitment and employee satisfaction processes.",
                            workMode: "ONSITE",
                            publishType: "COMPANY",
                            companyId: createdCompanies[1].id,
                            categoryId: createdCategories[2].id,
                            experienceLevel: "mid",
                            jobType: "FULL_TIME",
                            additionalInformation: "Looking for proactive individuals with experience in HR tools.",
                            location: "Chicago, IL",
                            requirements: ["Communication", "Problem-solving", "HR software"],
                            benefits: ["Health insurance", "Paid time off"],
                            applicationLinks: ["https://example.com/apply/hr"],
                            salay: 5000,
                            vacancies: 3,
                            workHours: "8",
                            languagesRequired: ["English"],
                        }
                    }),
                    prisma.jobAdvertisement.create({
                        data: {
                            title: "Graphic Designer",
                            description: "Create visually stunning assets for our marketing campaigns.",
                            workMode: "REMOTE",
                            publishType: "USER",
                            userId: createdUsers[2].id,
                            categoryId: createdCategories[1].id,
                            experienceLevel: "senior",
                            jobType: "PART_TIME",
                            additionalInformation: "Portfolio required for consideration.",
                            location: "Remote",
                            requirements: ["Photoshop", "Illustrator", "Creativity"],
                            benefits: ["Flexible schedule"],
                            applicationLinks: ["https://example.com/apply/designer"],
                            salay: 4000,
                            vacancies: 1,
                            workHours: "6",
                            languagesRequired: ["English"],
                        }
                    }),
                    prisma.jobAdvertisement.create({
                        data: {
                            title: "Data Scientist",
                            description: "Analyze and interpret complex data to provide insights for decision-making.",
                            workMode: "ONSITE",
                            publishType: "COMPANY",
                            companyId: createdCompanies[0].id,
                            categoryId: createdCategories[0].id,
                            experienceLevel: "mid",
                            jobType: "FULL_TIME",
                            additionalInformation: "Must have experience with machine learning algorithms.",
                            location: "Seattle, WA",
                            requirements: ["Python", "R", "Machine Learning", "Statistics"],
                            benefits: ["Health insurance", "Stock options"],
                            applicationLinks: ["https://example.com/apply/datascientist"],
                            salay: 9000,
                            vacancies: 1,
                            workHours: "8",
                            languagesRequired: ["English"],
                        }
                    }),
                    prisma.jobAdvertisement.create({
                        data: {
                            title: "Customer Support Specialist",
                            description: "Provide exceptional support to our clients via phone and email.",
                            workMode: "HYBRID",
                            publishType: "USER",
                            userId: createdUsers[0].id,
                            categoryId: createdCategories[3].id,
                            experienceLevel: "junior",
                            jobType: "FULL_TIME",
                            additionalInformation: "Training provided for the first two weeks.",
                            location: "Austin, TX",
                            requirements: ["Communication skills", "Problem-solving"],
                            benefits: ["Health insurance", "Gym membership"],
                            applicationLinks: ["https://example.com/apply/support"],
                            salay: 3000,
                            vacancies: 5,
                            workHours: "8",
                            languagesRequired: ["English"],
                        }
                    }),
                    prisma.jobAdvertisement.create({
                        data: {
                            title: "Project Manager",
                            description: "Oversee projects and ensure they are delivered on time and within budget.",
                            workMode: "ONSITE",
                            publishType: "COMPANY",
                            companyId: createdCompanies[1].id,
                            categoryId: createdCategories[3].id,
                            experienceLevel: "senior",
                            jobType: "INTERNSHIP",
                            additionalInformation: "PMP certification preferred.",
                            location: "Los Angeles, CA",
                            requirements: ["Leadership", "Budget management", "Agile"],
                            benefits: ["Bonuses", "Travel allowances"],
                            applicationLinks: ["https://example.com/apply/pm"],
                            salay: 12000,
                            vacancies: 1,
                            workHours: "8",
                            languagesRequired: ["English"],
                        }
                    }),
                    prisma.jobAdvertisement.create({
                        data: {
                            title: "DevOps Engineer",
                            description: "Implement CI/CD pipelines and manage cloud infrastructure.",
                            workMode: "REMOTE",
                            publishType: "USER",
                            userId: createdUsers[1].id,
                            categoryId: createdCategories[4].id,
                            experienceLevel: "mid",
                            jobType: "FULL_TIME",
                            additionalInformation: "Experience with AWS and Docker is a must.",
                            location: "Remote",
                            requirements: ["AWS", "Docker", "Kubernetes", "CI/CD"],
                            benefits: ["Flexible hours", "Remote-friendly"],
                            applicationLinks: ["https://example.com/apply/devops"],
                            salay: 8000,
                            vacancies: 2,
                            workHours: "8",
                            languagesRequired: ["English"],
                        }
                    }),
                    prisma.jobAdvertisement.create({
                        data: {
                            title: "Sales Representative",
                            description: "Drive sales growth by building strong client relationships.",
                            workMode: "ONSITE",
                            publishType: "COMPANY",
                            companyId: createdCompanies[0].id,
                            categoryId: createdCategories[3].id,
                            experienceLevel: "junior",
                            jobType: "FULL_TIME",
                            additionalInformation: "Great opportunity to grow in the company.",
                            location: "Miami, FL",
                            requirements: ["Sales experience", "Communication", "Negotiation"],
                            benefits: ["Bonuses", "Travel allowances"],
                            applicationLinks: ["https://example.com/apply/sales"],
                            salay: 5000,
                            vacancies: 4,
                            workHours: "8",
                            languagesRequired: ["English", "Spanish"],
                        }
                    }),
                ]);

                return c.json({ ok: true })
            } catch (error) {
                console.log(error);
            }
        });


        router.get("/", async (c) => {

        })

        return router;
    }
}





