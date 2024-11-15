using school_management.Models;

namespace school_management.Interface
{
    public interface IRegistrationRepository
    {
        Task<Registration> Create(Registration registration);
        Task<Registration?> Delete(Registration registration);
    }
}
