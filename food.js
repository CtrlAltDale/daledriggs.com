var beef = {
    calories: 185,
    protein: 19.4,
    carbs: 0,
    fiber: 0,
    fat: 12.3
};

var chickenBreast = {
    calories: 165,
    protein: 31,
    carbs: 0,
    fiber: 0,
    fat: 3.6
};

var turkey = {
    calories: 148,
    protein: 19.7,
    carbs: 0,
    fiber: 0,
    fat: 7.7
};

var shrimp = {
    calories: 80,
    protein: 19.7,
    carbs: 0,
    fiber: 0,
    fat: 0.4
};

var turkeySausage = {
    calories: 176,
    protein: 21.2,
    carbs: 0,
    fiber: 0,
    fat: 10.6
};

var foodMap = {
    beef: beef,
    chickenBreast: chickenBreast,
    turkey: turkey,
    shrimp: shrimp,
    turkeySausage: turkeySausage
};

function calculateFoodOutputs(food, preWeight, postWeight, proteinGoal) {
    var totalProtein = (preWeight / 100.0) * food.protein;
    var servingCount = totalProtein / proteinGoal;
    var totalCalories = (preWeight / 100.0) * food.calories;
    var caloriesPerServing = totalCalories / servingCount;
    var loseWeightToRecord = preWeight / servingCount;
    var weightToPutInBags = postWeight / servingCount;

    return {
        servingSize: servingCount,
        caloriesPerServing: caloriesPerServing,
        loseWeightToRecord: loseWeightToRecord,
        weightToPutInBags: weightToPutInBags,
        totalCalories: totalCalories,
        totalProtein: totalProtein
    };
}

function updateFoodRow() {
    var selectedFood = document.getElementById('foodDropdown').value;

    if (selectedFood === '') {
        document.getElementById('calories').textContent = '--';
        document.getElementById('protein').textContent = '--';
        return null;
    }

    var food = foodMap[selectedFood];
    if (food) {
        document.getElementById('calories').textContent = food.calories;
        document.getElementById('protein').textContent = food.protein;
    }

    return food || null;
}

function calculateOutputs() {
    var food = updateFoodRow();
    var preWeight = parseFloat(document.getElementById('preWeight').value);
    var postWeight = parseFloat(document.getElementById('postWeight').value);
    var proteinGoal = parseFloat(document.getElementById('proteinGoal').value);

    if (food && !isNaN(preWeight) && !isNaN(postWeight) && !isNaN(proteinGoal)) {
        var outputs = calculateFoodOutputs(food, preWeight, postWeight, proteinGoal);
        document.getElementById('servingSize').textContent = outputs.servingSize.toFixed(2);
        document.getElementById('proteinPerServing').textContent = proteinGoal.toFixed(2);
        document.getElementById('caloriesPerServing').textContent = outputs.caloriesPerServing.toFixed(2);
        document.getElementById('bagWeight').textContent = outputs.weightToPutInBags.toFixed(2);
        document.getElementById('loseItValue').textContent = outputs.loseWeightToRecord.toFixed(2);
    }
}

if (typeof module !== 'undefined') {
    module.exports = { calculateFoodOutputs, foodMap };
}