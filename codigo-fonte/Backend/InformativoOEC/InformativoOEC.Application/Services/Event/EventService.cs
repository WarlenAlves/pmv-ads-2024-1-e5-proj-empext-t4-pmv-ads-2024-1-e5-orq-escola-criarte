﻿using InformativoOEC.Application.Models.InputModels;
using InformativoOEC.Core.Repositories;

namespace InformativoOEC.Application.Services.Event;
public class EventService : IEventService
{
    private readonly IEventRepository _repository;
    public EventService(IEventRepository repository)
    {
        _repository = repository;
    }
    public async Task Create(EventInputModel input)
    {
        var @event = input.ToEntity();

        await _repository.AddAsync(@event);
    }
}
