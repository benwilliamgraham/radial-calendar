function main() {
    // setup sizing
    const diameter = 4082;

    // create canvas
    const canvas = document.createElement('canvas');
    canvas.width = diameter * 1.5;
    canvas.height = diameter * 1.1;
    // TODO: make this responsive
    canvas.style.width = `${canvas.width / 1.5}px`;
    canvas.style.height = `${canvas.height / 1.5}px`;
    document.body.appendChild(canvas);

    // get 2D context
    const context = canvas.getContext('2d');

    if (!context) {
        console.error('2d context not supported');
        return;
    }

    // get the year
    const year = new Date().getFullYear();

    // Get the number of days in the year
    var totalDaysInYear = 0;
    for (var i = 1; i <= 12; i++) {
        totalDaysInYear += new Date(year, i, 0).getDate();
    }

    // draw outer circle
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, diameter / 2, 0, 2 * Math.PI);
    context.stroke();

    // draw inner circle
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, diameter / 4, 0, 2 * Math.PI);
    context.stroke();

    // draw month dividers
    var elapsedDays = 0;
    for (var i = 1; i <= 12; i++) {
        const daysInMonth = new Date(year, i, 0).getDate();
        const angle = (elapsedDays / totalDaysInYear) * 2 * Math.PI;
        context.beginPath();
        context.moveTo(canvas.width / 2, canvas.height / 2);
        context.lineTo(canvas.width / 2 + diameter / 2 * Math.cos(angle), canvas.height / 2 + diameter / 2 * Math.sin(angle));
        context.stroke();

        // add days
        for (var j = 1; j <= daysInMonth; j++) {
            const dayAngle = ((elapsedDays + j) / totalDaysInYear) * 2 * Math.PI;
            const dayRadius = diameter / 4;
            context.beginPath();
            context.moveTo(canvas.width / 2 + dayRadius * Math.cos(dayAngle), canvas.height / 2 + dayRadius * Math.sin(dayAngle));
            context.lineTo(canvas.width / 2 + diameter / 2 * Math.cos(dayAngle), canvas.height / 2 + diameter / 2 * Math.sin(dayAngle));
            context.stroke();
        }

        elapsedDays += daysInMonth;
    }
}

main();