for x in range(1,80):
    print '''@keyframes updown%s {
    from { transform: translateY(-%spx); } 
      to { transform: translateY( %spx); }
}
''' % (x,x,x)
