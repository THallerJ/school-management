using school_management.Models;

namespace school_management.Interface
{
    public interface IRegistrationRepository
    {
        Task<Registration> CreateRegistration(Registration registration);
        Task<Registration?> DeleteRegistration(Registration registration);
    }
}
