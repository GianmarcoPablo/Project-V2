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


                const createdAdvertisementJobs = await Promise.all([
                    prisma.jobAdvertisement.create({
                        data: {
                            title: "aviso numero 1 titulo",
                            description: "Aliquam lobortis tristique velit eget placerat. Donec blandit lacus sapien, sit amet aliquet turpis scelerisque eu. Quisque tempus hendrerit lorem, sit amet pulvinar dui vestibulum hendrerit. Nullam ullamcorper metus nec posuere dictum. Mauris neque eros, porta sed vestibulum ac, tincidunt sed dolor. In pretium, purus sed egestas sagittis, purus velit maximus magna, rutrum posuere nulla odio a diam. Aenean neque libero, ornare in neque non, interdum tincidunt orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula sed risus eget ullamcorper. Morbi maximus, odio et facilisis mattis, quam mauris egestas est, at rhoncus nisi quam quis nisi. Vivamus scelerisque arcu vel luctus feugiat. Nullam aliquam, urna non semper pulvinar, ante augue ultricies velit, nec aliquam nunc ex non nibh. Sed dignissim scelerisque faucibus. Sed molestie eros sed purus lacinia maximus. Phasellus blandit, nulla in posuere lobortis, purus orci malesuada massa, vitae scelerisque ipsum ex quis neque.",
                            workMode: "REMOTE",
                            publishType: "USER",
                            userId: createdUsers[1].id,
                            categoryId: createdCategories[0].id,
                            experienceLevel: "junior",
                            jobType: "FREELANCE",
                            additionalInformation: "Probando informacion adicional para poner",
                            location: "Av Peru v2",
                            requirements: ["requirimeinto1", "requerimento2", "requerimiento3", "requerimiento4", "requirimiento5"],
                            benefits: ["beneficio1", "beneficio2", "beneficio3"],
                            applicationLinks: ["link1", "link2", "link3"],
                            salay: 4000,
                            vacancies: 4,
                            workHours: "5",
                            languagesRequired: ["language1", "language2", "language3"],
                        }
                    }),
                    prisma.jobAdvertisement.create({
                        data: {
                            title: "aviso numero 2 titulo",
                            description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
                            workMode: "ONSITE",
                            publishType: "COMPANY",
                            companyId: createdCompanies[1].id,
                            categoryId: createdCategories[2].id,
                            experienceLevel: "señior",
                            jobType: "PART_TIME",
                            additionalInformation: "Probando informacion adicional para poner en una aviso que se crea por compañiia",
                            location: "Av Brasil v2",
                            requirements: ["requirimeinto1", "requerimento2", "requerimiento3", "requerimiento4"],
                            benefits: ["beneficio1"],
                            applicationLinks: ["link1", "link2"],
                            salay: 8000,
                            vacancies: 2,
                            workHours: "5",
                            languagesRequired: ["language1"],
                        }
                    }),
                ])

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





