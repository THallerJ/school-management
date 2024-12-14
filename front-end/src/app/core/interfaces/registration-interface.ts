export interface RegistrationInterface {
    loadingRegistrations: boolean;

    finishLoadingRegistrations(): void;

    removeRegistration(id: number): void;

    addRegistration(): void;

    removeLocalRegistration(id: number): void;
}
