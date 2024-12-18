import classes from "./AboutPage.module.css"

function AboutPage() {
    return <div className={classes.container}>
        <h3>About Us</h3>
        <p>
            At our website, we aim to create a better experience for ordering food. <br /> Our mission is to provide fast, reliable,
            and easy-to-use services so that you can find your favorite meals with just a few clicks.
            Our team consists of energetic and creative professionals who use the latest technologies to build a secure and efficient platform for ordering and managing your meals.
            <br /> We value your feedback and are always striving to improve our services.
        </p>
        <span>Thank you for choosing us!</span>

        <h4>You may want to contact the creator of this website! :D</h4>
        <div className={classes.creator}>
            <a href="https://github.com/mohammadhosein-p/" target="_blank"><img width={60} src="/icon/github.svg" /></a>
            <a href="https://t.me/mhp705" target="_blank"><img width={60} src="/icon/telegram.svg" /></a>
        </div>
    </div>
}

export default AboutPage