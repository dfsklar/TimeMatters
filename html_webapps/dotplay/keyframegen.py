for x in range(1,100):
    xextended = x * 1.1;
    print '''@keyframes updown%s {
    from { transform: translateY(-%spx); } 
      to { transform: translateY( %spx); }
}
''' % (x,xextended,xextended)
