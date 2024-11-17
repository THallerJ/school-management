namespace school_management.Dtos.Common
{
    public class Filter
    {
        public int PageNumber { get; set; } = 1;

        public int PageSize { get; } = 20;
    }
}
