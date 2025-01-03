namespace school_management.Dtos.Common
{
    public class Filter
    {
        public int PageNumber { get; set; } = 1;

        public int PageSize { get; set; } = 20;

        public Boolean DisablePaging { get; set; } = false;
    }
}
