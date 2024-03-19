export interface MembersNotInGroup {
    Id: number,
    SchoolId: number,
    StudentId: number,
    ClassCode: string,
    FullName: string,
    ProgramId: number,
    ProgramCode: string,
    ProgramName: string
}
export interface MembersInGroup {
    Id: number,
    GroupId: number,
    GroupCode: string,
    Name: string,
    SchoolId: number,
    StudentId: number,
    StudentCode: string,
    FullName: string
}
export interface TeamMember {
    MemberId: number;
    StudentCode: string;
    ClassCode: string;
    FullName: string;
    TeamId: number;
    TeamName: string;
}