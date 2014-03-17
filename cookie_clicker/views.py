from django.shortcuts import render

# def something(request):
#     msg = request.websock.wait()
#     request.websocket.send(message)

def home(request):
    return render(request, 'home.html')
