import classes from "./OfferBanner.module.css"

function OfferBanner() {
    return (
        <div className={classes.offerContainer}>
            <img src="/mainpage/offer/background.png" className={classes.offerBanner} />
            <div className={classes.offerBannerDetails}>
                <div className={classes.bannerText}>
                    <h3>Get Discount Voucher Up To 20%</h3>
                    <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</h5>
                </div>
                <img src="/mainpage/offer/person.png" className="banner person" />
            </div>
        </div>)
}

export default OfferBanner