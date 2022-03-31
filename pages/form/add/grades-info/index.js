import { useState } from "react";
import { schools, courses } from "../../../../constants/schools-info";

export default function AddGradeDetailsFormPage() {

    const [selectedSchool, setSelectedSchool] = useState("");

    return (
        <div class="container" id="container-form">
            <div class="card">
                <div class="card-body">
                    <h6 class="text-muted card-subtitle mb-2">Complete the following form</h6>
                    <form method="POST" action="api/store/form" enctype="multipart/form-data">
                        <label for="schools">School</label>
                        {/* { (isMaster) ?  */}
                            <select class="form-control" id="schools" name="school">
                                {schools.map((school) => {
                                    return <option value={school}>{school}</option>;
                                })}
                            </select> 
                        {/* :
                            <select class="form-control" id="schools" name="school" onchange="optionChanged()">
                                <option value={ user.school }>{ user.school }</option>
                            </select>
                        } */}

                        <label for="period">Period</label>
                        <select class="form-control" id="period" name="period">
                            <option value="WINTER">WINTER</option>
                            <option value="SUMMER">SUMMER</option>
                            <option value="AUTUMN">AUTUMN</option>
                        </select>

                        <label for="course">Course</label>
                        <select class="form-control" name="course" id="courses">
                                {schools.map((school) => {
                                    return <option value={school}>{school}</option>;
                                })}
                            {/* <option value="<%= course.code %>"><%= course.code %> - <%= course.name %></option> */}
                        </select>

                        <label for="professor">Professor</label>
                        <input class="form-control" name="professor" id="professor"/>

                        <label for="exam-date">Exam Date</label>
                        <input class="form-control" type="datetime-local" name="exam_date" id="exam-date"/>

                        <label for="participants-no">Number of Participants</label>
                        <input class="form-control" type="number" name="participants_no" id="participants-no"/>

                        <label for="pass-no">Number of Participants Passed</label>
                        <input class="form-control" type="number" name="pass_no" id="pass-no"/>

                        <label for="grades-asset-url">Grades Asset</label>
                        <input class="form-control" type="url" name="grades_asset_url" id="grades-asset-url"/>

                        <label for="update-status">Update Status</label>
                        <select class="form-control" id="update_status" name="update_status">
                            <option value="INITIAL STATE">INITIAL STATE</option>
                            <option value="CORRECTIVE STATE">CORRECTIVE STATE</option>
                        </select>

                        <label for="notes">Notes</label>
                        <textarea class="form-control" name="notes" id="notes"></textarea>

                        <label>Grades File (.bau)</label>
                        <div>
                            <input type="file" name="grades_file" accept=".bau"/>
                        </div>

                        <div id="btn-container">
                            <button class="btn btn-primary" id="storeGrades" type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
