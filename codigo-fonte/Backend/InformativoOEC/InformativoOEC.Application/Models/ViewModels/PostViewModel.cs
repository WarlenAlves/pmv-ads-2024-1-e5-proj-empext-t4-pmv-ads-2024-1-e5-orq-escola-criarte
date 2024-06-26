﻿using InformativoOEC.Core.Entities;
using InformativoOEC.Core.ValueObjects;
using System.Reflection.Metadata;

namespace InformativoOEC.Application.Models.ViewModels;
public class PostViewModel
{
    public PostViewModel(Post post)
    {
        Id = post.Id;
        Content = post.Content;
        ImageURL = post.ImageURL;
        Date = post.Date;
        Address = post.Address;
        Username = post.Username;
        EventId = post.Event.Id;
    }

    public PostViewModel() { }

    public Guid Id { get; set; }
    public Content Content { get; }
    public string ImageURL { get; }
    public DateTime Date { get; }
    public Address Address { get; }
    public string Username { get; }
    public Guid? EventId { get; set; }
}
