const projectsData = [
    {
        id: 1,
        title: "Joywrite",
        description: "A secure, fully responsive blogging platform with JWT authentication, CRUD operations, and social sharing features.",
        image: "./assets/images/Jowwrite.png",
        alt: "Joywrite Project",
        category: "fullstack",
        technologies: [
            { name: "Node.js", color: "green" },
            { name: "Express.js", color: "gray" },
            { name: "MongoDB", color: "green" },
            { name: "EJS", color: "orange" }
        ],
        links: {
            github: "https://github.com/vishwasurad/Joywrite",
            live: "https://joywrite.onrender.com/"
        }
    },
    {
        id: 2,
        title: "Notes Saver",
        description: "A full-stack note management application with CRUD operations, real-time validation, and Redux state management.",
        image: "./assets/images/Notesaver.png",
        alt: "Notes Saver Project",
        category: "frontend",
        technologies: [
            { name: "React.js", color: "blue" },
            { name: "Redux", color: "purple" },
            { name: "Tailwind", color: "cyan" }
        ],
        links: {
            github: "https://github.com/vishwasurad/Note-Saver",
            live: "https://note-saver-eight.vercel.app/"
        }
    },
    {
        id: 3,
        title: "WhatsApp Web Clone",
        description: "A full-stack WhatsApp Web clone built with modern web technologies, featuring real-time messaging and a responsive interface that closely mimics the original WhatsApp Web experience.",
        image: "./assets/images/small-chat.png",
        alt: "WhatsApp Web Clone Project",
        category: "fullstack",
        technologies: [
            { name: "Node.js", color: "green" },
            { name: "Express.js", color: "gray" },
            { name: "MongoDB", color: "green" },
            { name: "React.js", color: "orange" }
        ],
        links: {
            github: "https://github.com/vishwasurad/WhatsappWebClone",
            live: "https://whatsapp-frontend-vishwa.onrender.com/"
        }
    },
    // {
    //     id: 4,
    //     title: "Code.Compile.Collaborate",
    //     description: "A collaborative coding platform with real-time editing, AI-powered hints, and secure assessment system.",
    //     image: null, // No image available
    //     alt: "Code.Compile.Collaborate Project",
    //     category: "fullstack",
    //     technologies: [
    //         { name: "React.js", color: "blue" },
    //         { name: "Node.js", color: "green" },
    //         { name: "Socket.IO", color: "yellow" },
    //         { name: "Judge0 API", color: "red" }
    //     ],
    //     links: {
    //         github: "#", // Add actual links when available
    //         live: "#"
    //     }
    // },   
     {
        id: 4,
        title: "Tic-Tac-Toe",
        description: "tic-tac-toe is easy and cool game to play.You can play this game with your friends.In this i have used html,css and javascript to make this game.",
        image: "./assets/images/tic-tac-toe.png",
        alt: "Tic-Tac-Toe Project",
        category: "frontend",
        technologies: [
            { name: "HTML", color: "blue" },
            { name: "CSS", color: "purple" },
            { name: "JavaScript", color: "cyan" }
        ],
        links: {
            github: "https://github.com/vishwasurad/Tic-Tac-Toe",
            live: "https://tic-tac-toe-five-blush-87.vercel.app/"
        }
    },
     {
        id: 5,
        title: "Netflix-Clone",
        description: "A clone of the popular Netflix streaming platform, built with modern web technologies and a responsive design.",
        image: "./assets/images/NetflixClone.png",
        alt: "Netflix Clone Project",
        category: "frontend",
        technologies: [
            { name: "HTML", color: "blue" },
            { name: "CSS", color: "purple" },
           
        ],
        links: {
            github: "https://github.com/vishwasurad/Netflix-Clone",
            live: "https://netflix-clone-sandy-kappa.vercel.app/"
        }
    },
    {
    id: 6,
    title: "Travel Booking Application",
    description: "Full-stack web application enabling users to search, book, and manage travel reservations across flights, trains, and buses. Built with Django and MySQL.",
    image: "./assets/images/tba.png", 
    alt: "Travel Booking Application - User dashboard showing booking history and travel options",
    category: "fullstack",
    technologies: [
        { name: "Django", color: "green" },
        { name: "Python", color: "blue" },
        { name: "Bootstrap", color: "purple" },
        { name: "MySQL", color: "orange" },
        { name: "HTML/CSS", color: "red" },
        { name: "JavaScript", color: "yellow" },
        { name: "Git", color: "gray" }
    ],
    links: {
        github: "https://github.com/vishwasurad/Travel-Booking",
        live: "https://vishwasurad.pythonanywhere.com/" 
    }
},
];

// Technology color mappings for consistent styling
const technologyColors = {
    green: {
        bg: "bg-green-100 dark:bg-green-900",
        text: "text-green-800 dark:text-green-200"
    },
    blue: {
        bg: "bg-blue-100 dark:bg-blue-900",
        text: "text-blue-800 dark:text-blue-200"
    },
    purple: {
        bg: "bg-purple-100 dark:bg-purple-900",
        text: "text-purple-800 dark:text-purple-200"
    },
    cyan: {
        bg: "bg-cyan-100 dark:bg-cyan-900",
        text: "text-cyan-800 dark:text-cyan-200"
    },
    gray: {
        bg: "bg-gray-100 dark:bg-gray-700",
        text: "text-gray-800 dark:text-gray-200"
    },
    orange: {
        bg: "bg-orange-100 dark:bg-orange-900",
        text: "text-orange-800 dark:text-orange-200"
    },
    yellow: {
        bg: "bg-yellow-100 dark:bg-yellow-900",
        text: "text-yellow-800 dark:text-yellow-200"
    },
    red: {
        bg: "bg-red-100 dark:bg-red-900",
        text: "text-red-800 dark:text-red-200"
    }
};

// Export the data for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { projectsData, technologyColors };
}