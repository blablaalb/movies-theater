namespace MoviesAPI.DTOs
{
    public class PaginationDTO
    {
        private int _recordsPerPage = 10;
        private readonly int _maxAmount = 50;

        public int Page { get; set; }
        public int RecordsPerPage
        {
            get { return _recordsPerPage; }
            set { _recordsPerPage = value > _maxAmount ? _maxAmount : value; }
        }

    }
}
