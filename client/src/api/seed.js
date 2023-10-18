const mock_users = [
        {
            "username": "andrea_piacquadio",
            "bio": "New merch available! Contact me for details.",
            "fullName": "Andrea",
            "image": "https://images.pexels.com/photos/3811855/pexels-photo-3811855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "skills": ["sewing", "tailor"],
            "site": "https://stock.adobe.com/it/contributor/200460681/olly%20ollyy",
            "instagram": "https://instagram.com/andreapiacquadio_",
            "twitter": ""
        },
        {
            "username": "beatriz_braga",
            "bio": "Now available for weddings or parties. Chef with 10+ years of experience with a large selection of dishes from mediteranean, tex-mex and thai cuisine.",
            "fullName": "Beatriz",
            "image": "https://images.pexels.com/photos/15656540/pexels-photo-15656540/free-photo-of-a-happy-chef-and-the-cooked-food-on-the-counter.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "skills": ["cooking", "catering"],
            "site": "https://www.pexels.com/@biabrg/",
            "instagram": "https://instagram.com/biabrg",
            "twitter": ""
        },
        {
            "username": "christina_morillo",
            "bio": "Frontend developer with over 5 years of experience available to help bring your ideas to life. Contact me for details and rates.",
            "fullName": "Christina",
            "image": "https://images.pexels.com/photos/1181280/pexels-photo-1181280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "skills": ["programming", "coding", "web development"],
            "site": "https://www.wocintechchat.com/",
            "instagram": "",
            "twitter": "https://twitter.com/wocintechchat"
        },
        {
            "username": "cottonbro_studio",
            "bio": "I have over 25 years experience working with all kinds of engines and vehicles. If it's broken, I can fix it.",
            "fullName": "Cotton",
            "image": "https://images.pexels.com/photos/4489744/pexels-photo-4489744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "skills": ["mechanic", "motorcycle repair"],
            "site": "http://omycotton.com/",
            "instagram": "https://instagram.com/cottonbro",
            "twitter": ""
        },
        {
            "username": "emmanuel_ik",
            "bio": "Electrical engineering student looking to trade my electrical work for help with creating a business website.",
            "fullName": "Emmanuel",
            "image": "https://images.pexels.com/photos/8005400/pexels-photo-8005400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "skills": ["electrical"],
            "site": "http://linktr.ee/Emmages",
            "instagram": "https://instagram.com/iamemmages",
            "twitter": "https://twitter.com/_emmages"
        },
        {
            "username": "gustavo_fring",
            "bio": "Novice pottery art nerd looking for an experienced teacher to help take my pottery skills to the next level.",
            "fullName": "hanah",
            "image": "https://images.pexels.com/photos/4241339/pexels-photo-4241339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "skills": ["pottery", "sculpting"],
            "site": "https://www.pexels.com/@gustavo-fring/",
            "instagram": "",
            "twitter": ""
        },
        {
            "username": "luis_negron",
            "bio": "Father/son landscaping business offering all lawn care services at reasonable prices. Try us out and see why our customers love us!",
            "fullName": "Luis",
            "image": "https://images.pexels.com/photos/13630739/pexels-photo-13630739.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
            "skills": ["landscaping", "DIY", "lawn maintenance", "gardening", "lawn care", "tree removal"],
            "site": "https://www.pexels.com/@luis-negron-260501657/",
            "instagram": "https://instagram.com/luis_c_negron",
            "twitter": ""
        },
        {
            "username": "tima_miroshnichenko",
            "bio": "DIYer and handyman available to help with any home repair project.",
            "fullName": "Tima",
            "image": "https://images.pexels.com/photos/6790061/pexels-photo-6790061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "skills": ["carpentry", "home repair"],
            "site": "http://mart-prod.com/",
            "instagram": "https://instagram.com/tima_miroshnichenko",
            "twitter": ""
        }
];

class SeedUsers {
    static async getUser(name) {
        if (name) {
            
            return mock_users?.filter(u => 
               u.username.toLocaleLowerCase().includes(name.toLocaleLowerCase())
            )

        }
        
        return;
    }
    static async getMockUsers() {
        return mock_users;
    }
}

export default SeedUsers;