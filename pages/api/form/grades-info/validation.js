export default function handler(req, res) {
    const formObject = req.body;

    let mandatoryFields = {
        school: "School",
        year: "Year",
        period: "Period",
        course: "Course",
        professor: "Professor",
        examDate: "Exam Date",
        participants_number: "Participants Number",
        pass_number: "Number of Participants Passed",
        grades_asset_url: "Grades Asset (Url)",
        grades_asset_hash: "Grades Asset (File Upload)",
        update_status: "Update Status"
    }

    let fieldsMissing = [];

    for (const attribute in formObject) {
        if (attribute == 'notes' || attribute == 'grades_asset_content') continue;
        else if (!formObject[attribute]) fieldsMissing.push(mandatoryFields[attribute]);
    }

    if (fieldsMissing.length == 0) return res.status(200).json({ error: false })
    else return res.status(400).json({
        error: true,
        msg: "Mandatory Fields (" +
            fieldsMissing.reduce(
                (text, value, i, array) =>
                    text + (i < array.length - 1 ? ', ' : ' and ') + value) + ") are missing!"
    });

}