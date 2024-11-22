export type SchoolDto = {
	Id: number;
	Name: string;
	Address: string;
	PhoneNumber: string;
}

// StudentDto.ts
export type StudentDto = {
	Id: number;
	FirstName: string;
	LastName: string;
	Email: string;
	SchoolId: number;
}

// TeacherDto.ts
export type TeacherDto = {
	Id: number;
	FirstName: string;
	LastName: string;
	Email: string;
	SchoolId: number;
	Subject: string;
}

// CourseDto.ts
export type CourseDto {
	Id: number;
	Name: string;
	Description: string;
	TeacherId: number;
	SchoolId: number;
}

// EnrollmentDto.ts
export type EnrollmentDto = {
	Id: number;
	StudentId: number;
	CourseId: number;
	Grade: string;
}

// SchoolNestedDto.ts
export type SchoolNestedDto = {
    Id: number;
    Name: string;
    Address: {
      Street: string;
      City: string;
      State: string;
      Zip: string;
    };
    PhoneNumber: string;
  }
  
  // StudentNestedDto.ts
  export interface StudentNestedDto {
    Id: number;
    FirstName: string;
    LastName: string;
    Email: string;
    School: {
      Id: number;
      Name: string;
      Address: {
        Street: string;
        City: string;
        State: string;
        Zip: string;
      };
      PhoneNumber: string;
    };
  }
  
  // TeacherNestedDto.ts
  export interface TeacherNestedDto {
    Id: number;
    FirstName: string;
    LastName: string;
    Email: string;
    School: {
      Id: number;
      Name: string;
      Address: {
        Street: string;
        City: string;
        State: string;
        Zip: string;
      };
      PhoneNumber: string;
    };
    Subject: string;
  }
  
  // CourseNestedDto.ts
  export interface CourseNestedDto {
    Id: number;
    Name: string;
    Description: string;
    Teacher: {
      Id: number;
      FirstName: string;
      LastName: string;
      Email: string;
      School: {
        Id: number;
        Name: string;
        Address: {
          Street: string;
          City: string;
          State: string;
          Zip: string;
        };
        PhoneNumber: string;
      };
      Subject: string;
    };
    School: {
      Id: number;
      Name: string;
      Address: {
        Street: string;
        City: string;
        State: string;
        Zip: string;
      };
      PhoneNumber: string;
    };
  }
  
  // EnrollmentNestedDto.ts
  export interface EnrollmentNestedDto {
    Id: number;
    Student: {
      Id: number;
      FirstName: string;
      LastName: string;
      Email: string;
      School: {
        Id: number;
        Name: string;
        Address: {
          Street: string;
          City: string;
          State: string;
          Zip: string;
        };
        PhoneNumber: string;
      };
    };
    Course: {
      Id: number;
      Name: string;
      Description: string;
      Teacher: {
        Id: number;
        FirstName: string;
        LastName: string;
        Email: string;
        School: {
          Id: number;
          Name: string;
          Address: {
            Street: string;
            City: string;
            State: string;
            Zip: string;
          };
          PhoneNumber: string;
        };
        Subject: string;
      };
      School: {
        Id: number;
        Name: string;
        Address: {
          Street: string;
          City: string;
          State: string;
          Zip: string;
        };
        PhoneNumber: string;
      };
    };
    Grade: string;
  }