import {LegExample, Legs} from "~/components/portfolio/Legs";
import {Portfolio} from "~/components/portfolio/Portfolio";
import {SchedulerPreview} from "~/components/portfolio/Scheduler";


const PortfolioStrategy = (props: {}) => {
    return (
        <div>
            <Portfolio/>
            <Legs preview={false}/>
            <Legs preview={true}/>
            <SchedulerPreview/>
            <LegExample/>
        </div>
    )

}
export default PortfolioStrategy;