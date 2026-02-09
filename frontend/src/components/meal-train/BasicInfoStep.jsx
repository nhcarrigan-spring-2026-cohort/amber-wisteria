import Button from "../Button";
import Input from "../Input";
import Label from "../Label";
import Textarea from "../Textarea";

export default function BasicInfoStep({
    mealTrainTitle,
    setMealTrainTitle,
    mealTrainDesc,
    setMealTrainDesc,
    beneficiaryName,
    setBeneficiaryName,
    onNext  
}) {
    return (
        <form onSubmit={onNext} className="space-y-5">
            {/* Title */}
            <div className="flex flex-col">
                <Label children="Meal Train Title" />
                <Input 
                    type="text"
                    value={mealTrainTitle}
                    onChange={e => setMealTrainTitle(e.target.value)}
                    placeholder="e.g. Meals for John's Recovery" 
                />
            </div>

            {/* Description */}
            <div className="flex flex-col">
                <Label children="Description" />
                <Textarea 
                    value={mealTrainDesc || ""}
                    onChange={e => setMealTrainDesc(e.target.value)}
                    placeholder="Add a short note about the situation..."
                    minLength={5}
                />              
            </div>

            {/* Beneficiary  */}
            <div className="flex flex-col">
                <Label children="Beneficiary Name" />
                <Input 
                    type="text"
                    value={beneficiaryName}
                    onChange={e => setBeneficiaryName(e.target.value)}
                    placeholder="Who will receive the meals?"
                />
            </div>

            {/* Button  */}
            <Button children="Next" className="w-full" variant="purple" onClick={onNext}/>
        </form>
    )

}