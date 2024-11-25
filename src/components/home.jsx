import React, { useState, useEffect } from 'react'
import Card from './cards'
import '../components/home.css'

export default function Home(props) {

    const [showHome, setShowHome] = useState(false)
    const [showTrend, setShowTrend] = useState(false)

    useEffect(() => {
        const homeDelay = setTimeout(() => {
            setShowHome(true)
        }, 600);

        const trendDelay = setTimeout(() => {
            setShowTrend(true)
        }, 900);

        return () => {
            clearTimeout(homeDelay);
            clearTimeout(trendDelay);
        }
    }, [])


    return (
        <>
            <div className="main">

                <div className={`home-content fade-in ${showHome ? 'visible' : ''}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <h1>Welcome to <u style={{ color: '#fff' }}><span style={{ color: '#634897' }}>{props.title}</span></u>!</h1>

                    <p className='para' style={{ maxWidth: '1000px', lineHeight: '30px' }}>Thank you for stopping by! This platform is designed for aspiring writers and creators like you, where you can explore diverse topics ranging from travel adventures and delicious food to lifestyle tips and personal stories.

                        Our mission is to inspire you to share your unique voice and connect with a vibrant community of bloggers. Whether you’re here to read, learn, or start your own blog, there’s something for everyone.

                        Dive in, explore our latest posts, and get inspired to create your own blog!

                        Happy blogging!</p>
                </div>

                <div className={`trending-posts fade-in ${showTrend ? 'visible' : ''}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >

                    <h1>Trending Posts</h1>

                    <div className="cards">
                        <Card image="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            topic="Technology"
                            title="What's New in 2025"
                            description="In 2025, expect advancements in AI, quantum computing, and 5G connectivity. Virtual and augmented reality will reshape entertainment and work, while sustainability tech focuses on energy efficiency. A year of intelligent innovations!"
                            date="01-10-2024"
                            author="Jack Reacher" />

                        <Card
                            image="https://images.pexels.com/photos/4526481/pexels-photo-4526481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            topic="Gaming"
                            title="Top 10 Games of 2023"
                            description="Explore the most exciting games of 2023, featuring innovative gameplay and stunning graphics. From indie hits to blockbuster franchises, discover what's captivating gamers this year."
                            date="09-20-2023"
                            author="Alex Martinez"
                        />

                        <Card
                            image="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            topic="Food"
                            title="Delicious Vegan Recipes to Try"
                            description="Discover a variety of mouth-watering vegan recipes that are easy to make and packed with flavor. From hearty meals to delightful desserts, there's something for everyone!"
                            date="09-25-2024"
                            author="Emma Brown"
                        />

                        <Card
                            image="https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            topic="Travel"
                            title="Hidden Gems: Top Travel Destinations"
                            description="Uncover lesser-known travel destinations that offer unique experiences away from the crowds. These hidden gems are perfect for your next adventure!"
                            date="02-12-2024"
                            author="Tom Wilson"
                        />

                        <Card
                            image="https://images.pexels.com/photos/6789401/pexels-photo-6789401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            topic="Astrology"
                            title="Understanding Your Birth Chart"
                            description="Dive into the basics of astrology and learn how to interpret your birth chart. Discover how the positions of the stars and planets at your birth influence your personality."
                            date="10-05-2023"
                            author="Luna Grey"
                        />

                        <Card
                            image="https://images.pexels.com/photos/4152722/pexels-photo-4152722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            topic="Space"
                            title="Exploring the Mysteries of Black Holes"
                            description="Black holes are among the most fascinating phenomena in the universe. Learn about their formation, properties, and the latest discoveries in space research."
                            date="18-07-2024"
                            author="Dr. Mia Thompson"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
