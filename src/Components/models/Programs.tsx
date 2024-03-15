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
export interface ProgramAndGroup {
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
    Image: string,
    GroupId: number,
    GroupCode: string,
    GroupName: string
}