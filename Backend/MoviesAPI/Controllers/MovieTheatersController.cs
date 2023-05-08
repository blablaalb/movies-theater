using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.Controllers
{
    [ApiController]
    [Route("api/movietheaters")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
    public class MovieTheatersController: ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public MovieTheatersController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<MovieTheaterDTO>>> Get()
        {
            var entities = await _context.MovieTheaters.OrderBy(x => x.Name).ToListAsync();
            return _mapper.Map<List<MovieTheaterDTO>>(entities);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<MovieTheaterDTO>> Get(int id)
        {
            var movieTheater = await _context.MovieTheaters.FirstOrDefaultAsync(x => x.Id == id);

            if (movieTheater == null)
            {
                return NotFound();
            }

            return _mapper.Map<MovieTheaterDTO>(movieTheater);
        }

        [HttpPost]
        public async Task<ActionResult> Post(MovieTheaterCreationDTO movieCreationDTO)
        {
            var movieTheater = _mapper.Map<MovieTheater>(movieCreationDTO);
            _context.Add(movieTheater);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, MovieTheaterCreationDTO movieCreationDTO)
        {
            var movieTheater = await _context.MovieTheaters.FirstOrDefaultAsync(x => x.Id == id);

            if (movieTheater == null)
            {
                return NotFound();
            }

            movieTheater = _mapper.Map(movieCreationDTO, movieTheater);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var movieTheater = await _context.MovieTheaters.FirstOrDefaultAsync(x => x.Id == id);
            if (movieTheater == null)
            {
                return NotFound();
            }

            _context.Remove(movieTheater);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}
