%w(rubygems sinatra yaml awesome_print net/http uri json twitter).each{|lib| require lib}

  get '/' do
    erb :index
  end

  get '/klout.json' do
    content_type :json
   
    @@config=YAML.load_file( 'lib/config.yml' )
    @results = Array.new
    
    def score(users)
      uri = URI.parse("http://api.klout.com/1/klout.json?key=#{@@config['api_key']}&users=#{users.join(",")}")
      result = Net::HTTP.get(uri)
      @results=@results | JSON.parse(result)["users"]
    end
    
    #Klout array only takes 5 users names at a time
    @@config['users'].each_slice(5) do |batch|
      score(batch)
    end
    
    #Get Top 10 users by sorting ont he kscore index
    @results.sort_by {|user| user["kscore"]}.reverse.slice(1,10).to_json
end