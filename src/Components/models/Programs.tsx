export interface Programs {
    Id: number,
    Code: string,
    Name: string,
    Description: string,
    Image: string,
    CreatedDate: Date,
    UpdatedDate: Date,
    SchoolYearId: number,
    StartDate: Date,
    EndDate: Date
}
export interface ProgramsOfAMember {
    Id: number,
    StudentId: number,
    ClassCode: string,
    FullName: string,
    ProgramId: number,
    ProgramCode: string,
    ProgramName: string,
    CreatedDate: Date,
    UpdatedDate: Date,
    Description: string,
    Image: string
}
export interface ProgramsOfATeacher {
    ProgramId: number,
    Description: string,
    Name: string,
    Image: string
}