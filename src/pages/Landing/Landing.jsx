import ActionCardsSection from "./ActionCardsSection/ActionCardsSection"
import HeroSection from "./HeroSection/HeroSection"
import HowItWorksSection from "./HowItWorksSection/HowItWorksSection"
import WhyChooseUsSection from "./WhyChooseUsSection/WhyChooseUsSection"


const Landing = () => {
    return (
        <main>
            <HeroSection />
            <ActionCardsSection />
            <HowItWorksSection />
            <WhyChooseUsSection />
        </main>
    )
}

export default Landing